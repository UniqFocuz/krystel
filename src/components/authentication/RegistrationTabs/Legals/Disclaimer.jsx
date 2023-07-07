import { List, ListItem, Text } from "@chakra-ui/react";
import { primaryColour } from "../../../../lib/settings";

function Disclaimer() {
    return (
        <>
        <Text fontSize={'xs'} textAlign={'justify'}>
        Using our platform to earn carries certain risks and considerations. We would like to inform our users about the following points before engaging in any activities related to earning on our platform:
        </Text>
        <List my={2} spacing={3} fontSize={'xs'} textAlign={"justify"}>
            <ListItem>
            <b style={{color: primaryColour}}>Financial Risks:</b> Earning through our platform involves financial risks. The amount of earned may vary and is subject to market conditions, user demand, and other factors beyond our control. There is no guarantee of consistent or substantial earnings.
            </ListItem>
            <ListItem>
            <b style={{color: primaryColour}}>Addiction Warning:</b> It is important to be aware that engaging in activities to earn on our platform may lead to addictive behavior. The allure of making income quickly can be enticing, and individuals may become overly focused on earning money, potentially neglecting other important aspects of their lives. We urge users to exercise self-control and be mindful of their well-being.
            </ListItem>
            <ListItem>
            <b style={{color: primaryColour}}>Responsible Use:</b> We encourage responsible use of our platform. Users should prioritize their financial stability, manage their time effectively, and ensure a healthy work-life balance. It is essential to set realistic expectations and avoid excessive dependence on earning through our platform.
            </ListItem>
            <ListItem>
            <b style={{color: primaryColour}}>Legal Compliance:</b> Users are responsible for complying with all applicable laws and regulations related to earning money, including taxation and reporting requirements. It is crucial to understand and adhere to the legal obligations in your jurisdiction to avoid any legal consequences.
            </ListItem>
            <ListItem>
            <b style={{color: primaryColour}}>Privacy and Security:</b> Protecting your personal and financial information is of utmost importance. We implement security measures to safeguard your data, but it is essential for users to exercise caution when sharing sensitive information and to use secure and trusted payment methods.
            </ListItem>
            <ListItem>
            <b style={{color: primaryColour}}>Education and Support:</b> We encourage users to educate themselves about financial management, investment strategies, and other relevant topics. Seek advice from financial professionals if needed. Additionally, if you or someone you know is experiencing financial difficulties or addictive behavior related to earning on our platform, please seek appropriate support and assistance.
            </ListItem>
            <ListItem>
            Please note that our platform provides opportunities to earn money, but individual results may vary. We strive to create a fair and transparent environment; however, we do not guarantee any specific earnings or outcomes.
            </ListItem>
            <ListItem>
            By using our platform, you acknowledge and accept these risks and responsibilities. It is important to make informed decisions and seek professional advice when necessary.
            </ListItem>
            <ListItem>
            Remember to prioritize your well-being, be financially responsible, and make the most of the opportunities available on our platform.
            </ListItem>
        </List>
        </>
    )
}

export default Disclaimer