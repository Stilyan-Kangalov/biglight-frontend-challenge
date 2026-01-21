type HelloBiglightProps = {
  message?: string
}

export function HelloBiglight({ message = 'Hello Biglight' }: HelloBiglightProps) {
  return <h1>{message}</h1>
}

