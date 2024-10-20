import React, { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { axiosPrivate } from '../../axios/Axios';
import { toast } from 'react-toastify';
import {jwtDecode} from 'jwt-decode'; 

interface ProtectedRouteProps {
    children?: ReactNode;
    allowedRole: string[];
}

interface DecodedDetails {
    userName: string;
    userID: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRole }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasAccess, setHasAccess] = useState<boolean>(false);
    const [userID, setUserID] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const token = localStorage.getItem('token');

    // Add logs to debug token and userID
    console.log("Token in localStorage:", token);
    console.log("userID State before useEffect:", userID);

    // Decode the token and set userID and userName
    useEffect(() => {
        if (token) {
            try {
                const decodedToken: DecodedDetails = jwtDecode(token);
                setUserID(decodedToken.userID);
                setUserName(decodedToken.userName);
                console.log('Decoded userID:', decodedToken.userID);
                console.log('Decoded userName:', decodedToken.userName);
            } catch (error) {
                console.error('Token decoding failed:', error);
                toast.error('Invalid token');
            }
        } else {
            setIsLoading(false);
        }
    }, [token]);

    // Log after userID is supposed to be set
    useEffect(() => {
        console.log("userID State in second useEffect:", userID);
    }, [userID]);

    // Fetch user role when userID is available
    useEffect(() => {
        const fetchUserRole = async () => {
            if (userID) {
                console.log('Fetching user data for userID:', userID); // Log userID before the API call

                try {
                    const response = await axiosPrivate.get(`/register/getRegister?userID=${userID}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    const userRole = response.data?.data?.[0]?.role;
                    console.log('Fetched userRole:', userRole);

                    if (userRole && (userRole === 'Admin' || allowedRole.includes(userRole))) {
                        setHasAccess(true);
                    } else {
                        toast.error('Access Denied');
                    }
                } catch (error) {
                    console.error('Error fetching user:', error);
                    toast.error('Error fetching user data');
                } finally {
                    setIsLoading(false);
                }
            }
        };

        // Trigger fetching user data if userID is available
        if (userID) {
            fetchUserRole();
        } else {
            console.log("userID is still null, skipping fetchUserRole");
        }
    }, [userID, allowedRole, token]);

    // If token is not present, navigate to login
    if (!token) {
        return <Navigate to={'/Login'} />;
    }

    // While loading
    if (isLoading) {
        return <p>Loading...</p>;
    }

    // If access is denied
    if (!hasAccess) {
        return <Navigate to={'/AccessDenied'} />;
    }

    // If access is granted, render children
    return <>{children}</>;
};

export default ProtectedRoute;
