"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Point = { x: number; y: number };

const CELL_SIZE = 18;
const INITIAL_SPEED = 120;

function getRandomFood(snake: Point[], gridW: number, gridH: number): Point {
    let food: Point;
    do {
        food = {
            x: Math.floor(Math.random() * gridW),
            y: Math.floor(Math.random() * gridH),
        };
    } while (snake.some((s) => s.x === food.x && s.y === food.y));
    return food;
}

interface SnakeGameProps {
    onExit: () => void;
}

export default function SnakeGame({ onExit }: SnakeGameProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const directionRef = useRef<Direction>("RIGHT");
    const nextDirectionRef = useRef<Direction>("RIGHT");
    const animFrameRef = useRef<number>(0);

    const [gridSize, setGridSize] = useState({ w: 20, h: 15 });
    const [canvasSize, setCanvasSize] = useState({ w: 360, h: 270 });

    const [snake, setSnake] = useState<Point[]>([
        { x: 5, y: 7 },
        { x: 4, y: 7 },
        { x: 3, y: 7 },
    ]);
    const [food, setFood] = useState<Point>({ x: 15, y: 7 });
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameState, setGameState] = useState<"waiting" | "playing" | "over">(
        "waiting"
    );

    const snakeRef = useRef(snake);
    const foodRef = useRef(food);
    const scoreRef = useRef(score);
    const gridRef = useRef(gridSize);
    snakeRef.current = snake;
    foodRef.current = food;
    scoreRef.current = score;
    gridRef.current = gridSize;

    // Measure container and compute grid
    useEffect(() => {
        const measure = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const w = Math.floor(rect.width / CELL_SIZE);
            const h = Math.floor(rect.height / CELL_SIZE);
            const clampedW = Math.max(10, w);
            const clampedH = Math.max(8, h);
            setGridSize({ w: clampedW, h: clampedH });
            setCanvasSize({ w: clampedW * CELL_SIZE, h: clampedH * CELL_SIZE });
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    const resetGame = useCallback(() => {
        const g = gridRef.current;
        const initialSnake = [
            { x: 5, y: Math.floor(g.h / 2) },
            { x: 4, y: Math.floor(g.h / 2) },
            { x: 3, y: Math.floor(g.h / 2) },
        ];
        setSnake(initialSnake);
        setFood(getRandomFood(initialSnake, g.w, g.h));
        setScore(0);
        directionRef.current = "RIGHT";
        nextDirectionRef.current = "RIGHT";
        setGameState("playing");
    }, []);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const currentSnake = snakeRef.current;
        const currentFood = foodRef.current;

        // Clear
        ctx.fillStyle = "#0A0A0A";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Grid
        ctx.strokeStyle = "rgba(255,255,255,0.025)";
        ctx.lineWidth = 0.5;
        for (let i = 0; i <= gridRef.current.w; i++) {
            ctx.beginPath();
            ctx.moveTo(i * CELL_SIZE, 0);
            ctx.lineTo(i * CELL_SIZE, gridRef.current.h * CELL_SIZE);
            ctx.stroke();
        }
        for (let i = 0; i <= gridRef.current.h; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * CELL_SIZE);
            ctx.lineTo(gridRef.current.w * CELL_SIZE, i * CELL_SIZE);
            ctx.stroke();
        }

        // Food
        const pulse = 0.6 + Math.sin(Date.now() / 200) * 0.4;
        ctx.shadowColor = "#EF4444";
        ctx.shadowBlur = 10 * pulse;
        ctx.fillStyle = "#EF4444";
        ctx.beginPath();
        ctx.arc(
            currentFood.x * CELL_SIZE + CELL_SIZE / 2,
            currentFood.y * CELL_SIZE + CELL_SIZE / 2,
            CELL_SIZE / 2.5,
            0,
            Math.PI * 2
        );
        ctx.fill();
        ctx.shadowBlur = 0;

        // Snake
        currentSnake.forEach((segment, i) => {
            const isHead = i === 0;
            const progress = 1 - i / currentSnake.length;

            if (isHead) {
                ctx.shadowColor = "#10B981";
                ctx.shadowBlur = 8;
                ctx.fillStyle = "#10B981";
            } else {
                ctx.shadowBlur = 0;
                ctx.fillStyle = `rgba(16, 185, 129, ${0.3 + progress * 0.5})`;
            }

            const padding = isHead ? 1 : 2;
            ctx.beginPath();
            ctx.roundRect(
                segment.x * CELL_SIZE + padding,
                segment.y * CELL_SIZE + padding,
                CELL_SIZE - padding * 2,
                CELL_SIZE - padding * 2,
                isHead ? 4 : 2
            );
            ctx.fill();
        });

        ctx.shadowBlur = 0;
    }, []);

    // Continuous draw for food pulse animation
    useEffect(() => {
        let running = true;
        const loop = () => {
            if (!running) return;
            draw();
            animFrameRef.current = requestAnimationFrame(loop);
        };
        loop();
        return () => {
            running = false;
            cancelAnimationFrame(animFrameRef.current);
        };
    }, [draw]);

    const tick = useCallback(() => {
        const currentSnake = [...snakeRef.current];
        const currentFood = foodRef.current;
        const g = gridRef.current;
        directionRef.current = nextDirectionRef.current;

        const head = { ...currentSnake[0] };
        switch (directionRef.current) {
            case "UP":
                head.y -= 1;
                break;
            case "DOWN":
                head.y += 1;
                break;
            case "LEFT":
                head.x -= 1;
                break;
            case "RIGHT":
                head.x += 1;
                break;
        }

        if (head.x < 0 || head.x >= g.w || head.y < 0 || head.y >= g.h) {
            setGameState("over");
            setHighScore((prev) => Math.max(prev, scoreRef.current));
            return;
        }

        if (currentSnake.some((s) => s.x === head.x && s.y === head.y)) {
            setGameState("over");
            setHighScore((prev) => Math.max(prev, scoreRef.current));
            return;
        }

        const newSnake = [head, ...currentSnake];

        if (head.x === currentFood.x && head.y === currentFood.y) {
            const newScore = scoreRef.current + 10;
            setScore(newScore);
            setFood(getRandomFood(newSnake, g.w, g.h));
        } else {
            newSnake.pop();
        }

        setSnake(newSnake);
    }, []);

    // Game loop
    useEffect(() => {
        if (gameState === "playing") {
            gameLoopRef.current = setInterval(tick, INITIAL_SPEED);
            return () => {
                if (gameLoopRef.current) clearInterval(gameLoopRef.current);
            };
        }
    }, [gameState, tick]);

    const handleDirection = useCallback((newDir: Direction) => {
        const dir = directionRef.current;
        if (newDir === "UP" && dir !== "DOWN") nextDirectionRef.current = "UP";
        if (newDir === "DOWN" && dir !== "UP") nextDirectionRef.current = "DOWN";
        if (newDir === "LEFT" && dir !== "RIGHT") nextDirectionRef.current = "LEFT";
        if (newDir === "RIGHT" && dir !== "LEFT") nextDirectionRef.current = "RIGHT";
    }, []);

    // Keyboard
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            // Escape always exits
            if (e.key === "Escape") {
                e.preventDefault();
                e.stopPropagation();
                if (gameLoopRef.current) clearInterval(gameLoopRef.current);
                onExit();
                return;
            }

            if (gameState === "waiting" || gameState === "over") {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    resetGame();
                    return;
                }
                return;
            }

            const dir = directionRef.current;
            switch (e.key) {
                case "ArrowUp":
                case "w":
                case "W":
                    e.preventDefault();
                    e.stopPropagation();
                    handleDirection("UP");
                    break;
                case "ArrowDown":
                case "s":
                case "S":
                    e.preventDefault();
                    e.stopPropagation();
                    handleDirection("DOWN");
                    break;
                case "ArrowLeft":
                case "a":
                case "A":
                    e.preventDefault();
                    e.stopPropagation();
                    handleDirection("LEFT");
                    break;
                case "ArrowRight":
                case "d":
                case "D":
                    e.preventDefault();
                    e.stopPropagation();
                    handleDirection("RIGHT");
                    break;
            }
        };

        window.addEventListener("keydown", handleKey, true);
        return () => window.removeEventListener("keydown", handleKey, true);
    }, [gameState, resetGame, onExit]);

    return (
        <div className="flex flex-col h-full">
            {/* HUD bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 shrink-0">
                <div className="flex items-center gap-3">
                    <span className="text-accent font-bold text-sm">🐍 Snake</span>
                    <span className="text-muted text-[11px]">
                        <span className="text-green">WASD</span> / Arrows to move
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-xs text-green">
                        Score: <span className="text-text font-bold">{score}</span>
                    </span>
                    <span className="text-xs text-muted">
                        Best: <span className="text-accent font-bold">{highScore}</span>
                    </span>
                    <button
                        onClick={onExit}
                        className="px-2 py-0.5 text-[10px] font-mono border border-white/10 rounded
                     text-muted hover:text-error hover:border-error/30
                     transition-all cursor-pointer"
                    >
                        ESC Exit
                    </button>
                </div>
            </div>

            {/* Game area */}
            <div ref={containerRef} className="flex-1 flex items-center justify-center p-2 relative overflow-hidden">
                <div className="relative" style={{ width: canvasSize.w, height: canvasSize.h }}>
                    <canvas
                        ref={canvasRef}
                        width={canvasSize.w}
                        height={canvasSize.h}
                        className="block rounded"
                    />

                    {/* Overlay */}
                    {gameState !== "playing" && (
                        <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center gap-3 rounded">
                            {gameState === "over" && (
                                <>
                                    <p className="text-error font-bold text-base">GAME OVER</p>
                                    <p className="text-accent font-bold text-2xl">
                                        {score}
                                        <span className="text-muted text-sm ml-1">pts</span>
                                    </p>
                                </>
                            )}
                            {gameState === "waiting" && (
                                <p className="text-green text-sm text-center px-6">
                                    Eat the <span className="text-error">●</span> food. Don&apos;t
                                    hit the walls or yourself!
                                </p>
                            )}
                            <button
                                onClick={resetGame}
                                className="mt-1 px-5 py-2 text-xs font-mono border border-accent/30 rounded
                         text-accent hover:bg-accent/10 hover:border-accent/50
                         transition-all cursor-pointer"
                            >
                                {gameState === "over" ? "Play Again" : "Start Game"}
                            </button>
                            <p className="text-muted text-[10px]">
                                Press <span className="text-accent">Enter</span> to start
                                {" · "}
                                <span className="text-accent">ESC</span> to exit
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile D-Pad Controls (Visible only on small screens) */}
            <div className="md:hidden flex flex-col items-center justify-center pb-6 shrink-0 gap-2">
                <button
                    className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-xl text-accent active:bg-white/10"
                    onClick={(e) => { e.preventDefault(); handleDirection("UP"); }}
                >
                    ↑
                </button>
                <div className="flex gap-2">
                    <button
                        className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-xl text-accent active:bg-white/10"
                        onClick={(e) => { e.preventDefault(); handleDirection("LEFT"); }}
                    >
                        ←
                    </button>
                    <div className="w-14 h-14 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-white/10" />
                    </div>
                    <button
                        className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-xl text-accent active:bg-white/10"
                        onClick={(e) => { e.preventDefault(); handleDirection("RIGHT"); }}
                    >
                        →
                    </button>
                </div>
                <button
                    className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-xl text-accent active:bg-white/10"
                    onClick={(e) => { e.preventDefault(); handleDirection("DOWN"); }}
                >
                    ↓
                </button>

                {gameState !== "playing" && (
                    <button
                        className="mt-4 px-6 py-3 bg-accent text-black font-bold rounded-lg"
                        onClick={resetGame}
                    >
                        {gameState === "over" ? "RESTART" : "START"}
                    </button>
                )}
            </div>
        </div>
    );
}
