import React, { useEffect, useState } from 'react';
import "./styles/tree.css"
import { Avatar, Box, Text } from '@chakra-ui/react';
import { primaryColour } from '../../lib/settings';
import { AiOutlineUser } from 'react-icons/ai';


const BinaryTree = ({data, navigateNode}) => {
    return (
        data &&
        <Box py={5}>
            <div className="hv-wrapper" >
                <div className="hv-item" role='button' onClick={() => navigateNode(data.username)}>
                    <div className="hv-item-parent">
                        <Box p={2} mx={8} textAlign={'center'} fontWeight={'bold'} color={primaryColour}>
                            <Avatar name={data.name} size={'md'} mb={1} />
                            <Text fontSize={'xs'} fontWeight={'bold'}>{data.username}</Text>
                        </Box>
                    </div>
                    <div className="hv-item-children">
                        <div className="hv-item-child">
                            <div className="hv-item">{
                                data.children.alpha ?
                                <Box p={2} mx={8} textAlign={'center'} fontWeight={'bold'} color={primaryColour} role="button" onClick={() => navigateNode(data.children.alpha.username)}>
                                    <Avatar name={data.children.alpha.name} size={'md'} mb={1} />
                                    <Text fontSize={'xs'} fontWeight={'bold'}>{data.children.alpha.username}</Text>
                                </Box>
                                : 
                                <Box p={2} mx={8} textAlign={'center'} fontWeight={'bold'} color={primaryColour}>
                                    <Avatar icon={<AiOutlineUser fontSize='1.5rem' />} size={'md'} mb={1} />
                                </Box>
                            }
                            </div>
                        </div>
                        <div className="hv-item-child">
                            <div className="hv-item">{
                                data.children.beta ?
                                <Box p={2} mx={8} textAlign={'center'} fontWeight={'bold'} color={primaryColour} role="button" onClick={() => navigateNode(data.children.alpha.username)}>
                                    <Avatar name={data.children.beta.name} size={'md'} mb={1} />
                                    <Text fontSize={'xs'} fontWeight={'bold'}>{data.children.beta.username}</Text>
                                </Box>
                                :
                                <Box p={2} mx={8} textAlign={'center'} fontWeight={'bold'} color={primaryColour}>
                                    <Avatar  icon={<AiOutlineUser fontSize='1.5rem' />} size={'md'} mb={1} />
                                </Box>
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default BinaryTree;
