type HelloBiglightProps = {
  message?: string
}

export function HelloBiglight({ message = 'Hello Biglight!' }: HelloBiglightProps) {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <h1 className="text-center">{message}</h1>
    </div>
  )
}

