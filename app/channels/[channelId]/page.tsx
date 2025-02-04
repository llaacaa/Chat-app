export default function ChatPage({
  params,
}: {
  params: { channelId: string };
}) {
  const { channelId } = params;
  return <div>ChatPage id: {channelId}</div>;
}
