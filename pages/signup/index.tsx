
import Wrapper from "@/layout/wrapper/Wrapper";
import dynamic from "next/dynamic";





 
const SignUpMain = dynamic(()=>import('@/components/SignUpMain/SignUpMain'), { ssr: false })





export default function index() {
  return (
    <Wrapper>
        <SignUpMain />
    </Wrapper>
  );
}
