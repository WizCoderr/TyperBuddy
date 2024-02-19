import essentialTipsImage from "@/assets/img/blogs/essential-tips-for-speed-accuracy-and-efficiency.jpg";
import TypeFaster from "@/assets/img/blogs/blog1.jpg";
import TypeAndEarn from "@/assets/img/blogs/type_and_earn.jpeg";
import overcomeTypingAnxiety from "@/assets/img/blogs/how-to-overcome-typing-anxiety-and-build-confidence.jpg";
import incresed_efficiency from "@/assets/img/blogs/typing-shortcuts-and-tricks-for-increased-efficiency.jpg";
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
    {
        id: "type-and-earn",
        title: "Type and Earn",
        date: "2024-02-10",
        description:
            "In a world where words wield power and speed is of the essence, mastering the art of typing isn't just a useful skill—it's a gateway to success. Welcome to Typerbuddy, where keystrokes pave the way to triumph and earning potential knows no bounds.",
        image: TypeAndEarn,
        alt: "Type and Earn",
    },
    {
        id: "how-to-overcome-typing-anxiety-and-build-confidence",
        title: "How to Overcome Typing Anxiety and Build Confidence",
        date: "2024-02-10",
        description: "Building Confidence One Keystroke at a Time.",
        image: overcomeTypingAnxiety,
        alt: "overcomeTypingAnxiety",
    },
    {
        id: "typing-shortcuts-and-tricks-for-increased-efficiency",
        title: "Typing Shortcuts and Tricks for Increased Efficiency",
        date: "2024-02-19",
        description: "Essential Typing Shortcuts and Tricks",
        image: incresed_efficiency,
        alt: "typing-shortcuts-and-tricks-for-increased-efficiency",
    },
];

export function getPostData(id: string) {
    return blogPostData.find((post) => post.id === id);
}
