import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import fs from 'fs';
import path from 'path';

// 1. Register Figma/Tokens Studio logic
register(StyleDictionary);

// Helper function to fix references in the JSON
function fixReferences(obj, currentSet = '') {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => fixReferences(item, currentSet));
  }
  
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    // Track which token set we're in (e.g., "Alias colours/BrandA", "Mapped/BrandA")
    let newSet = currentSet;
    if (key.includes('/') || (currentSet === '' && (key === 'Primitives' || key === 'Alias colours' || key === 'Mapped' || key === 'Responsive'))) {
      newSet = key;
    } else if (currentSet.startsWith('Alias colours/') || currentSet.startsWith('Mapped/')) {
      newSet = currentSet; // Keep the current set context
    }
    
    if (key === 'value' && typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
      // This is a reference
      const refPath = value.slice(1, -1);
      
      // If reference starts with Colour, Scale, Font - it's likely from Primitives/Default
      if (refPath.startsWith('Colour.') || refPath.startsWith('Scale.') || refPath.startsWith('Font.')) {
        result[key] = `{Primitives/Default.${refPath}}`;
      }
      // If reference starts with Surface, Text, Icon, Border, Font (in Mapped context) - it's from Mapped section
      else if ((refPath.startsWith('Surface.') || refPath.startsWith('Text.') || refPath.startsWith('Icon.') || refPath.startsWith('Border.') || refPath.startsWith('Font.')) && currentSet.startsWith('Mapped/')) {
        result[key] = `{${currentSet}.${refPath}}`;
      }
      // If reference is a short path (like {Positive.Light}) and we're in a Brand context
      else if (!refPath.includes('/') && !refPath.startsWith('Primitives') && !refPath.startsWith('Responsive') && !refPath.startsWith('Colour.')) {
        // Check if we're in a BrandA or BrandB context
        if (currentSet.includes('BrandA')) {
          result[key] = `{Alias colours/BrandA.${refPath}}`;
        } else if (currentSet.includes('BrandB')) {
          result[key] = `{Alias colours/BrandB.${refPath}}`;
        } else {
          result[key] = value; // Keep as is if we can't determine context
        }
      } else {
        result[key] = value;
      }
    } else {
      result[key] = fixReferences(value, newSet);
    }
  }
  return result;
}

async function runBuild() {
  // Read and preprocess the JSON to fix references
  const tokensPath = path.join(process.cwd(), 'src/tokens/figma-tokens.json');
  const tokensContent = fs.readFileSync(tokensPath, 'utf-8');
  const tokensData = JSON.parse(tokensContent);
  
  // Fix references - convert {Colour.X} to {Primitives.Default.Colour.X} where needed
  const fixedTokens = fixReferences(tokensData);
  
  // Write fixed tokens to a temp file
  const tempTokensPath = path.join(process.cwd(), 'src/tokens/tokens-fixed.json');
  fs.writeFileSync(tempTokensPath, JSON.stringify(fixedTokens, null, 2));

  const brands = [
    { name: 'brand-booker', tokenKey: 'BrandA' },
    { name: 'brand-venus', tokenKey: 'BrandB' }
  ];

  for (const brand of brands) {
    console.log(`\n🚀 Building ${brand.name}...`);

    const sd = new StyleDictionary({
      // Use the fixed tokens file
      source: [tempTokensPath],
      preprocessors: ['tokens-studio'],
      platforms: {
        css: {
          transformGroup: 'tokens-studio',
          buildPath: 'src/styles/generated/',
          files: [
            {
              destination: `${brand.name}-tokens.css`,
              format: 'css/variables',
              // Filter tokens: include global primitives, responsive tokens, and brand-specific tokens
              filter: (token) => {
                const pathStr = token.path.join('.');
                const otherBrand = brand.tokenKey === 'BrandA' ? 'BrandB' : 'BrandA';
                
                // Exclude the other brand's tokens completely
                if (pathStr.includes(otherBrand)) {
                  return false;
                }
                
                // Include Primitives tokens (but not brand-specific ones, excluded above)
                if (pathStr.startsWith('Primitives.')) return true;
                // Include all Responsive tokens
                if (pathStr.startsWith('Responsive.')) return true;
                // Include brand-specific sections
                if (pathStr.includes(brand.tokenKey)) return true;
                
                return false; // Exclude everything else
              },
              options: {
                // Wrap the variables in a class name so you can toggle them in Preact
                // Use brand-booker for BrandA and brand-venus for BrandB
                selector: `.${brand.name}`
              }
            }
          ]
        }
      }
    });

    await sd.buildAllPlatforms();
  }
  
  // Clean up temp file
  fs.unlinkSync(tempTokensPath);
  console.log('\n✅ All brands generated successfully!');
}

runBuild();