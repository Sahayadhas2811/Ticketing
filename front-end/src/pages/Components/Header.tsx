import React from "react";
import Sidebar from '../Components/Sidebar'
import { Box, Container, Divider, IconButton, InputBase, Typography, useMediaQuery } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme, Theme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const Header:React.FC = ()=>{
    const theme:Theme = useTheme();
    const ismobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const handleHomeRoute = ()=>{
        navigate('/Home');
    }
    return(
        <Box sx={{display:'flex', width:"100%"}}>
            <Box sx={{
                m:5, flexGrow:1
            }}>
                <Box sx={{
                    display:"flex",
                    alignItems:'center',
                    justifyContent:'space-between',
                    width:"100%",
                    boxSizing:"border-box"
                    }}>
                    <IconButton
                    color="inherit"
                    aria-label="Home"
                    sx={{display:'flex', alignItems:'center'}}
                    type='submit'
                    onClick={handleHomeRoute}
                    >
                        <HomeIcon/>
                    </IconButton>

                    <Box
                    sx={{
                        display:'flex',
                        alignItems:'center',
                        border:`1px solid ${theme.palette.divider}`,
                        borderRadius:theme.shape.borderRadius,
                        width:ismobile?'100%':'300px',
                        padding:'2px 8px ',
                        maxWidth:'100%'
                    }}
                    >
                        <InputBase
                        placeholder="Search..."
                        inputProps={{'aria-label':'search'}}
                        sx={{flex:1}}
                        />
                        <IconButton type="button" aria-label="search" sx={{padding:1}}>
                        <SearchIcon/>
                        </IconButton>
                        
                    </Box>
                </Box>
            </Box>
        </Box>
        
    )

}

export default Header