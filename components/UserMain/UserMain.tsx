import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { useAppSelector } from '@/hooks/redux/useAppSelector';
import { useRouter } from 'next/router';


const bull = ()=>{
    return(

    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    />
   
    
   )}
  
 
  const card = ()=> {
    
   const router = useRouter();
 const { userData} = useAppSelector((state) => state.userSlice);

   
  const handelUpdate = ()=>{
         router.push("/update")
  }
    return(
    <>
      <CardContent>
     
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          UserName : {userData?.fullName}
         </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
         Role : {userData?.role.roleDisplayName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
         Email : {userData?.email}
        </Typography>
        <Typography variant="body2">
          Good to stay with us....
          <br />
          {"a benevolent smile"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"  onClick={handelUpdate}>Update Profile</Button>
      </CardActions>
    </>
    )};
  

const UserMain = () => {
       return (
   
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" style={{ textAlign: "center" }}>{card()}</Card>
    </Box>
   
  )
}
export default UserMain