
import Wrapper from "@/layout/wrapper/Wrapper";
import dynamic from "next/dynamic";




const ForgotMain = dynamic(() => import('@/components/ForgotMain/ForgotMain'), { ssr: false })
 






export default function index() {
  return (
    <Wrapper>
        <ForgotMain />
    </Wrapper>
  );
}
