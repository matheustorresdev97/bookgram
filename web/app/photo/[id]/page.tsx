export default async function PhotoIdPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <main>
            <h1>Photo id: {id}</h1>
        </main>
    );
}