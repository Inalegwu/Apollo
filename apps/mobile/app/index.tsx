import { Box, Text } from "@gluestack-ui/themed";

export default function Page() {
	return (
		<Box width="100%" flex={1} backgroundColor="$coolGray200">
			<Text size="lg" color="$white" fontWeight="bold">
				Home page
			</Text>
		</Box>
	);
}
