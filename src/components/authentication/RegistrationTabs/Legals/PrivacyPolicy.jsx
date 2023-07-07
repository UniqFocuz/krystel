import { List, ListItem, Text } from "@chakra-ui/react";
import { primaryColour } from "../../../../lib/settings";

function PrivacyPolicy() {
    return (
        <>
        <Text fontSize="xs" textAlign="justify">
            We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website.
        </Text>
        <List my={2} spacing={3} fontSize="xs" textAlign="justify">
            <ListItem>
            <Text mr={1} as="b" color={primaryColour}>
                Information Collection:
            </Text>We collect information from you when you create an account, fill out forms, or interact with our services. This may include your name, email address, contact details, and other relevant information necessary to complete your profile. We use this information solely for the purpose of providing and improving our services to you. We do not share this information with any third parties without your consent, except as required by law.
            </ListItem>
            <ListItem>
            <Text mr={1} as="b" color={primaryColour}>
                Data Security: 
            </Text>We use your personal information to provide and improve our services, personalize your experience, communicate with you, and deliver relevant content and advertisements. We take appropriate measures to ensure the security of your personal information and protect it from unauthorized access, alteration, or disclosure. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure.
            </ListItem>
            <ListItem>
            <Text mr={1} as="b" color={primaryColour}>
            Data Retention:
            </Text>We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected and to comply with legal obligations. Once your information is no longer needed, we will securely dispose of it.
            </ListItem>
            <ListItem>
            <Text mr={1} as="b" color={primaryColour}>
                Cookies:
            </Text>Krystel.io may use cookies or similar technologies to enhance your user experience. These cookies are used to collect information about your preferences and browsing activities on our website. You can choose to disable cookies through your browser settings, but please note that this may affect certain functionality on Krystel.io.
            </ListItem>
            <ListItem>
            <Text mr={1} as="b" color={primaryColour}>
                Third-Party Links
            </Text>Krystel.io may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to read the privacy policies of those websites before providing any personal information.
            </ListItem>
            <ListItem>
            <Text mr={1} as="b" color={primaryColour}>
            Children's Privacy:
            </Text>Krystel.io is not intended for use by individuals under the age of 13. We do not knowingly collect personal information from children. If you believe that we have inadvertently collected information from a child under the age of 13, please contact us immediately.
            </ListItem>
            <ListItem>
            <Text mr={1} as="b" color={primaryColour}>
                Your Rights:
            </Text>You have the right to access, correct, update, or delete your personal information. You may also have the right to restrict or object to certain data processing activities. Please contact us if you wish to exercise any of these rights. We comply with applicable data protection laws and regulations, including the General Data Protection Regulation (GDPR) if applicable. If you are a resident of the European Economic Area (EEA), you have additional rights under the GDPR.
            </ListItem>
            <ListItem>
            <Text mr={1} as="b" color={primaryColour}>
                Changes to Privacy Policy:
            </Text>We may update our Privacy Policy from time to time. Any changes will be posted on this page. We encourage you to review the Privacy Policy periodically to stay informed about how we collect, use, and protect your information.
            </ListItem>
        </List>
        </>
    )
}

export default PrivacyPolicy