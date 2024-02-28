import Wrapper from "@/layout/wrapper/Wrapper";
import dynamic from "next/dynamic";





 
const UpdateMain = dynamic(()=>import('@/components/UpdateMain/UpdateMain'), { ssr: false })





export default function index() {
  return (
    <Wrapper>
        <UpdateMain />
    </Wrapper>
  );
}
