import WalksContainer from "@/components/WalksContainer";
import Header from "@/components/Header";

export const dynamic = 'force-dynamic'

export default async function Index() {
  return (
    <>
      <Header date="2023-10-01" />
      <WalksContainer date="2023-10-01"/>
    </>
  )
}
