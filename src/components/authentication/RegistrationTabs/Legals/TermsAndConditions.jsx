import { List, ListItem, Text } from "@chakra-ui/react";
import { primaryColour } from "../../../../lib/settings";

function TermsAndConditions() {
    return (
        <>
        <Text fontSize={'xs'} textAlign={'justify'}>
        Using our platform to earn carries certain risks and considerations. We would like to inform our users about the following points before engaging in any activities related to earning on our platform:
        </Text>
        <List my={2} spacing={3} fontSize={'xs'} textAlign={"justify"}>
            <ListItem>
            <b style={{color: primaryColour}}>Financial Risks:</b> Earning through our platform involves financial risks. The amount of earned may vary and is subject to market conditions, user demand, and other factors beyond our control. There is no guarantee of consistent or substantial earnings.
            </ListItem>
        </List>
        </>

    )
}

export default TermsAndConditions