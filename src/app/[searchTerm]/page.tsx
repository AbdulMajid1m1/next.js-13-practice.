import getWikiResults from "../../../lib/getWikiResult";
import Item from "./components/Item";

type Props = {
    params: {
        searchTerm: string;
    };
};

export async function generateMetadata({ params: { searchTerm } }: Props) {
    const wikiData: Promise<SearchResult> = getWikiResults(searchTerm);
    const data = await wikiData;
    const displayTerm = searchTerm.replaceAll('%20', ' ');

    if (!data?.query?.pages) {
        return {
            title: `${displayTerm} Not Found`
        };
    }

    return {
        title: displayTerm,
        description: `Search results for ${displayTerm}`
    };
}

export default async function SearchResults({ params: { searchTerm } }: Props) {
    const wikiData: Promise<SearchResult> = getWikiResults(searchTerm);
    const data = await wikiData;
    const results: Result[] | undefined = data?.query?.pages;

    return (
        <div className="min-h-screen bg-slate-200 flex flex-col">
            <header className="bg-blue-600 text-white py-4 text-center">
                <h1 className="text-2xl">Wiki Search Results</h1>
            </header>
            <main className="flex-1 p-4 mx-auto max-w-lg">
                {results
                    ? Object.values(results).map(result => {
                        return <Item key={result.pageid} result={result} />
                    })
                    : <h2 className="text-xl text-center py-4 bg-white rounded shadow">{`${searchTerm} Not Found`}</h2>
                }
            </main>
            <footer className="bg-blue-600 text-white py-4 text-center">
                Abdul Majid
            </footer>
        </div>
    );
}
