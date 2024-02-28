import Wrapper from "@/layout/wrapper/Wrapper";
import dynamic from "next/dynamic";





 
const UserMain = dynamic(()=>import('@/components/UserMain/UserMain'), { ssr: false })





export default function index() {
  return (
    <Wrapper>
        <UserMain />
    </Wrapper>
  );
}
