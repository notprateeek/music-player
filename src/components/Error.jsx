import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export const Error = () => {
  return (
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  )
}
