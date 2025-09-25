export type Subject = {
    id: string;
    name: string;
    progress: number;
    stars: number;
};

export type QuizAnswer = {
    question: string;
    selected: string;
    correct: string;
    isCorrect: boolean;
};

export type QuizResult = {
    topic: string;
    answers: QuizAnswer[];
};
