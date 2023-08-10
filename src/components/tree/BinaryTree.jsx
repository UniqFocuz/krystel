import React from 'react';
import "./styles/tree.css"
import { Avatar, AvatarBadge, Box, Stack, Text } from '@chakra-ui/react';
import { primaryColour } from '../../lib/settings';
import { AiOutlineUser } from 'react-icons/ai';


const BinaryTree = ({ data, navigateNode }) => {
    return (
        data &&
        <Box py={5}>
            <div className="hv-wrapper" >
                <div className="hv-item" role='button'>
                    <div className="hv-item-parent">
                        <Box p={2} mx={8} textAlign={'center'} fontWeight={'bold'} color={primaryColour} onDoubleClick={() => navigateNode(data.username)}>
                            <Avatar name={data.name} size={'md'} mb={1} >
                                <AvatarBadge bg={ data.status === 'invalid' ? 'gray.400' : data.status === 'inactive' ? 'red.300' : data.status === 'active' && 'green.300' } boxSize='1em' />
                            </Avatar>
                            <Stack gap={0}>
                                <Text fontSize={'xs'} fontWeight={'bold'}>{data.username}</Text>
                                <Text fontSize={'2xs'} fontWeight={'bold'}>{data.nickname}</Text>
                            </Stack>
                        </Box>
                    </div>
                    <div className="hv-item-children">
                        <div className="hv-item-child">
                            <div className="hv-item">{
                                data.children.alpha ?
                                    <Box p={2} mx={8} textAlign={'center'} fontWeight={'bold'} color={primaryColour} role="button" onDoubleClick={() => navigateNode(data.children.alpha.username)}>
                                        <Avatar name={data.children.alpha.name} size={'md'} mb={1} >
                                            <AvatarBadge bg={ data.children.alpha.status === 'invalid' ? 'gray.400' : data.children.alpha.status === 'inactive' ? 'red.300' : data.children.alpha.status === 'active' && 'green.300'} boxSize='1em' />
                                        </Avatar>
                                        <Stack gap={0}>
                                            <Text fontSize={'xs'} fontWeight={'bold'}>{data.children.alpha.username}</Text>
                                            <Text fontSize={'2xs'} fontWeight={'bold'}>{data.children.alpha.nickname}</Text>
                                        </Stack>
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
                                    <Box p={2} mx={8} textAlign={'center'} fontWeight={'bold'} color={primaryColour} role="button" onDoubleClick={() => navigateNode(data.children.beta.username)}>
                                        <Avatar name={data.children.beta.name} size={'md'} mb={1} >
                                            <AvatarBadge bg={ data.children.beta.status === 'invalid' ? 'gray.400' : data.children.beta.status === 'inactive' ? 'red.300' : data.children.beta.status === 'active' && 'green.300' } boxSize='1em' />
                                        </Avatar>
                                        <Stack gap={0}>
                                            <Text fontSize={'xs'} fontWeight={'bold'}>{data.children.beta.username}</Text>
                                            <Text fontSize={'2xs'} fontWeight={'bold'}>{data.children.beta.nickname}</Text>
                                        </Stack>
                                    </Box>
                                    :
                                    <Box p={2} mx={8} textAlign={'center'} fontWeight={'bold'} color={primaryColour} pointerEvents={"none"}>
                                        <Avatar icon={<AiOutlineUser fontSize='1.5rem' />} size={'md'} mb={1} />
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
