export default async function ProfileUserPage({
    params,
}: {
    params: Promise<{ user: string }>;
}) {
    const { user } = await params;

    return (
        <main>
            <h1>User: {user}</h1>
        </main>
    );
}