export interface EverythingNews {

    status: string;
    totalResults: number;
    articles: [
        {
            source: {
                id: any;
                name: string;
            },
            author: string;
            title: string;
            description: string;
            url: string;
            urlToImage: string;
            publishedAt: string;
            content: string
        }
    ]


}

