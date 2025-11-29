import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface Question {
    id: number;
    question: string;
    choices: string[];
    correctAnswer: number;
}

interface QuizModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function QuizModal({ isOpen, onClose }: QuizModalProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
    const [submitted, setSubmitted] = useState(false);

    const questions: Question[] = [
        {
            id: 1,
            question: "How long did it take to build the Great Pyramid of Khufu?",
            choices: [
                "10 years",
                "20 years",
                "30 years",
                "50 years"
            ],
            correctAnswer: 1
        },
        {
            id: 2,
            question: "Approximately how many stone blocks were used to build the Great Pyramid?",
            choices: [
                "500,000 blocks",
                "1 million blocks",
                "2.3 million blocks",
                "5 million blocks"
            ],
            correctAnswer: 2
        },
        {
            id: 3,
            question: "What was the primary purpose of the pyramids?",
            choices: [
                "To store grain",
                "To serve as temples",
                "To be tombs for pharaohs",
                "To be astronomical observatories"
            ],
            correctAnswer: 2
        }
    ];

    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    const isFirstQuestion = currentQuestionIndex === 0;
    const hasAnsweredCurrent = selectedAnswers[currentQuestion.id] !== undefined;

    const handleAnswerSelect = (questionId: number, choiceIndex: number) => {
        if (!submitted) {
            setSelectedAnswers({
                ...selectedAnswers,
                [questionId]: choiceIndex
            });
        }
    };

    const handleNext = () => {
        if (!isLastQuestion) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (!isFirstQuestion) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = () => {
        if (Object.keys(selectedAnswers).length === questions.length) {
            setSubmitted(true);
        }
    };

    const handleClose = () => {
        setSelectedAnswers({});
        setSubmitted(false);
        setCurrentQuestionIndex(0);
        onClose();
    };

    const calculateScore = () => {
        let correct = 0;
        questions.forEach(question => {
            if (selectedAnswers[question.id] === question.correctAnswer) {
                correct++;
            }
        });
        return correct;
    };

    if (!isOpen) return null;

    const score = submitted ? calculateScore() : 0;
    const allAnswered = Object.keys(selectedAnswers).length === questions.length;

    // Show results view if submitted
    if (submitted) {
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="sticky top-0 bg-gradient-to-r from-[#a33013] to-[#e17624] text-white p-6 rounded-t-2xl flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">Quiz Results</h2>
                            <p className="text-white/90">See how you did!</p>
                        </div>
                        <button
                            onClick={handleClose}
                            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                            aria-label="Close quiz"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* All Questions with Results */}
                    <div className="p-6 space-y-6">
                        {questions.map((question, qIndex) => {
                            const isCorrect = selectedAnswers[question.id] === question.correctAnswer;
                            const isIncorrect = selectedAnswers[question.id] !== question.correctAnswer;

                            return (
                                <div key={question.id} className="bg-gray-50 rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${isCorrect ? 'bg-[#2cc75c] text-white' : 'bg-red-500 text-white'
                                            }`}>
                                            {qIndex + 1}
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {question.question}
                                        </h3>
                                    </div>
                                    <div className="space-y-3">
                                        {question.choices.map((choice, choiceIndex) => {
                                            const isSelected = selectedAnswers[question.id] === choiceIndex;
                                            const isCorrectChoice = choiceIndex === question.correctAnswer;

                                            let choiceClasses = "w-full text-left p-4 rounded-lg border-2 ";

                                            if (isCorrectChoice) {
                                                choiceClasses += "bg-[#2cc75c]/10 border-[#2cc75c] text-gray-900";
                                            } else if (isSelected && !isCorrectChoice) {
                                                choiceClasses += "bg-red-50 border-red-500 text-gray-900";
                                            } else {
                                                choiceClasses += "bg-white border-gray-200 text-gray-600";
                                            }

                                            return (
                                                <div key={choiceIndex} className={choiceClasses}>
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isCorrectChoice
                                                                ? 'border-[#2cc75c] bg-[#2cc75c]'
                                                                : isSelected && !isCorrectChoice
                                                                    ? 'border-red-500 bg-red-500'
                                                                    : 'border-gray-300'
                                                            }`}>
                                                            {isCorrectChoice && (
                                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                                            )}
                                                            {isSelected && !isCorrectChoice && (
                                                                <X className="w-4 h-4 text-white" />
                                                            )}
                                                        </div>
                                                        <span className="font-medium">{choice}</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Score Summary */}
                    <div className="mx-6 mb-6 bg-gradient-to-r from-[#a33013] to-[#e17624] text-white p-6 rounded-xl text-center">
                        <h3 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h3>
                        <p className="text-white/90 text-lg mb-4">
                            You scored {score} out of {questions.length}
                        </p>
                        <p className="text-white/90">
                            {score === questions.length
                                ? "Perfect score! You're a pyramid expert! 🎉"
                                : score >= 2
                                    ? "Great job! Keep learning! 👍"
                                    : "Keep studying to improve your score! 📚"}
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="p-6 bg-gray-50 rounded-b-2xl">
                        <button
                            onClick={handleClose}
                            className="w-full py-4 rounded-xl font-semibold bg-[#e17624] text-white hover:bg-[#c96520] transition-all"
                        >
                            Finish
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Show single question view
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#a33013] to-[#e17624] text-white p-6 rounded-t-2xl flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-[#e17624] mb-1">Pyramid Knowledge Quiz</h2>
                        <p className="text-white/90">Question {currentQuestionIndex + 1} of {questions.length}</p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                        aria-label="Close quiz"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="bg-gray-200 h-2">
                    <div
                        className="bg-[#e17624] h-2 transition-all duration-300"
                        style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    ></div>
                </div>

                {/* Current Question */}
                <div className="p-8">
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6">
                            {currentQuestion.question}
                        </h3>
                        <div className="space-y-3">
                            {currentQuestion.choices.map((choice, choiceIndex) => {
                                const isSelected = selectedAnswers[currentQuestion.id] === choiceIndex;

                                let choiceClasses = "w-full text-left p-4 rounded-lg border-2 transition-all ";

                                if (isSelected) {
                                    choiceClasses += "bg-[#e17624]/10 border-[#e17624] text-gray-900";
                                } else {
                                    choiceClasses += "bg-white border-gray-200 text-gray-900 hover:border-[#e17624] hover:bg-[#e17624]/5";
                                }

                                return (
                                    <button
                                        key={choiceIndex}
                                        onClick={() => handleAnswerSelect(currentQuestion.id, choiceIndex)}
                                        className={choiceClasses}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected
                                                    ? 'border-[#e17624] bg-[#e17624]'
                                                    : 'border-gray-300'
                                                }`}>
                                                {isSelected && (
                                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                                )}
                                            </div>
                                            <span className="font-medium">{choice}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="p-6 bg-gray-50 rounded-b-2xl">
                    <div className="flex gap-4">
                        {/* Previous Button */}
                        {!isFirstQuestion && (
                            <button
                                onClick={handlePrevious}
                                className="px-6 py-4 rounded-xl font-semibold bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Previous
                            </button>
                        )}

                        {/* Spacer */}
                        <div className="flex-1"></div>

                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="px-6 py-4 rounded-xl font-semibold text-red-600 bg-white border-2 border-red-600 hover:bg-red-50 transition-all"
                        >
                            Close
                        </button>

                        {/* Next or Submit Button */}
                        {!isLastQuestion ? (
                            <button
                                onClick={handleNext}
                                disabled={!hasAnsweredCurrent}
                                className={`px-6 py-4 rounded-xl font-semibold transition-all flex items-center gap-2 ${hasAnsweredCurrent
                                        ? 'bg-[#e17624] text-white hover:bg-[#c96520]'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Next Question
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={!allAnswered}
                                className={`px-6 py-4 rounded-xl font-semibold transition-all ${allAnswered
                                        ? 'bg-[#2cc75c] text-white hover:bg-[#28b350]'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Submit Quiz
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
