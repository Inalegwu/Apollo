import { observer, useObserveEffect } from "@legendapp/state/react";
import { FilePlus } from "@phosphor-icons/react";
import { Button, Flex, Text } from "@radix-ui/themes";
import { trpc } from "@shared/config";
import { generateUniqueIdentifier } from "@src/shared/utils";
import { createLazyFileRoute } from "@tanstack/react-router";
import { FileItem } from "../components";
import { globalState$, transferFiles } from "../state";

export const Route = createLazyFileRoute("/")({
	component: observer(Index),
});

function Index() {
	const { firstLaunch } = globalState$.get();

	const { mutate: startNode } = trpc.server.startServer.useMutation();

	const { mutate: selectFiles, data } = trpc.files.selectFiles.useMutation({
		onSuccess: (data) => {
			if (data.status === false) {
				return;
			}

			transferFiles.files.set(data.data);
		},
	});

	useObserveEffect((e) => {
		if (firstLaunch) {
			console.log("first launch detected");
			globalState$.applicationId.set(generateUniqueIdentifier());
		}

		startNode();
	});

	return (
		<Flex direction="column" className="w-full h-full">
			<Flex className="w-full" p="2" width="100%" gap="2" direction="column">
				<Flex align="center" justify="between">
					<Flex direction="column" grow="1" align="start">
						<Text size="1">Send Files</Text>
					</Flex>
					<Button
						onClick={() => selectFiles()}
						variant="soft"
						color="gray"
						size="1"
					>
						<Text size="1">Select Files</Text>
						<FilePlus />
					</Button>
				</Flex>
				<Flex
					className="w-full max-h-40 overflow-y-scroll"
					gap="2"
					direction="column"
				>
					{transferFiles.files.get().map((v, idx) => (
						<FileItem file={v} key={`${idx}-${v.fileName}`} />
					))}
				</Flex>
			</Flex>
			<Flex grow="1" p="2">
				content
			</Flex>
		</Flex>
	);
}
