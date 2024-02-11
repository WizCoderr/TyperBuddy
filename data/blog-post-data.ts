import essentialTipsImage from "@/assets/img/blogs/essential-tips-for-speed-accuracy-and-efficiency.jpg";
export interface BlogPostData {
    id: string;
    title: string;
    date: string;
    description: string;
    image: string;
    alt: string;
}

export const blogPostData: BlogPostData[] = [
    {
        id: "essential-tips-for-speed-accuracy-and-efficiency",
        title: "Essential Tips for Speed, Accuracy, and Efficiency",
        date: "2024-02-10",
        description:
            "Unlock the secrets to becoming a typing maestro with our expert tips and techniques! In this article, we'll delve into the essential strategies you need to improve your typing speed, accuracy, and efficiency. Whether you're a beginner looking to build a solid foundation or a seasoned typist aiming to reach new heights, this guide has something for everyone. Get ready to transform your typing skills and elevate your productivity to the next level!",
        image: essentialTipsImage,
        alt: "Essential Tips for Speed, Accuracy, and Efficiency",
    },
];

export function getPostData(id: string) {
    return blogPostData.find((post) => post.id === id);
}
