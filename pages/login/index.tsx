import Wrapper from "@/layout/wrapper/Wrapper";
import dynamic from "next/dynamic";




const LoginMain = dynamic(() => import('@/components/LoginMain/LoginMain'), { ssr: false })
 






export default function index() {
  return (
    <Wrapper>
        <LoginMain />
    </Wrapper>
  );
}
