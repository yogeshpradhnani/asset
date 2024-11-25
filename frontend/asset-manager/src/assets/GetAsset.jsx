import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Label } from '@headlessui/react';

export default function GetAsset() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/assets/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      
        
        const data = await response.json();
        console.log(data.data);
    
        setAssets(data.data);
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };
  
    fetchAssets();
  }, []);

  return (
   <>
  
    <Box sx={{ minWidth: 275 }} name="Assets">
       
        
       <Card variant="outlined">
         <div className='mt-24 grid grid-cols-1 gap-4 md:grid-cols-3'>
           {assets.map((asset, index) => (
             <div key={index} className='border-2 border-blue-500 m-2'>
               <CardContent>
                 <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                   {index}
                 </Typography>
                 <Typography variant="h5" component="div">
                 {Object.values(asset.name)}
                 </Typography>
                 <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                 {Object.values(asset.description)}
                 </Typography>
                 <Typography variant="body2">
                     <label htmlFor='AssinedTo'> Name of user :- </label>
                 {Object.values(asset.assignedTo?.name || "Not Assigned")}
                   <br />
                   {Object.values(asset?.assignedDate || "")}
                 </Typography>
               </CardContent>
               <CardActions>
                 <Button size="small">Learn More</Button>
               </CardActions>
             </div>
           ))}
         </div>
       </Card>
     </Box>
  
   </>
  );
}