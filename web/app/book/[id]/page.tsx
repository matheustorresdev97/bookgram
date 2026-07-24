export default async function BookIdPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <main>
            <h1>Book id: {id}</h1>
        </main>
    );
}
