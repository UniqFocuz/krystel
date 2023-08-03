import React, { useEffect, useState } from 'react';
import "./styles/tree.css"
import { Avatar, Box, Text } from '@chakra-ui/react';
import { primaryColour } from '../../lib/settings';
import { AiOutlineUser } from 'react-icons/ai';


const BinaryTree = ({data}) => {
    return (
        <Box>
            <div className="hv-wrapper" >
                <div className="hv-item">
                    <div className="hv-item-parent">
                        <Box p={2} mx={8} textAlign={'center'} fontWeight={'bold'} color={primaryColour}>
                            <Avatar name={data.name} size={'md'} mb={1} />
                            <Text fontSize={'xs'} fontWeight={'bold'}>{data.username}</Text>
                        </Box>
                    </div>
                    <div className="hv-item-children">
                        {
                            data.children.map((children, index) => (
                                <div className="hv-item-child" key={index}>
                                    <div className="hv-item">
                                        <Box p={2} mx={8} textAlign={'center'} fontWeight={'bold'} color={primaryColour}>
                                            <Avatar name={children.name} size={'md'} mb={1} />
                                            <Text fontSize={'xs'} fontWeight={'bold'}>{children.username}</Text>
                                        </Box>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default BinaryTree;
