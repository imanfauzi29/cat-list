import HomeScreen from "./screen/HomeScreen"
import {QueryClient, QueryClientProvider} from "react-query"

const queryClient = new QueryClient()

export default function Page() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <HomeScreen />
      </QueryClientProvider>
    </>
  )
}