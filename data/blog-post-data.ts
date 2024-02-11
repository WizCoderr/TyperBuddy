import essentialTipsImage from "@/assets/img/blogs/essential-tips-for-speed-accuracy-and-efficiency.jpg";
import TypeFaster from "@/assets/img/blogs/blog1.jpg";
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
    {
        id: "typefaster-and-effiently",
        title: "TypeFaster and Effiently",
        date: "2024-02-10",
        description:
            "In today's fast-paced digital world, typing efficiently is a valuable skill that can significantly enhance your productivity and effectiveness, whether you're a student, a professional, or someone who spends a lot of time on a computer. In this blog, we'll explore various techniques and tools to help you type faster and more efficiently, ultimately saving you time and energy.",
        image: TypeFaster,
        alt: "TypeFaster and Effiently",
    },
];

export function getPostData(id: string) {
    return blogPostData.find((post) => post.id === id);
}
