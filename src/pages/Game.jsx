import { Text, View } from "@lightningjs/solid";
import { Column } from '@lightningjs/solid-primitives';
import { createEffect, createSignal } from "solid-js";
import Utils from '../lib/GameUtils.js'
import Grid from "../components/Grid.jsx";

export default function Game() {
    const [index, setIndex] = createSignal(0)
    const [tiles, setTiles] = createSignal(['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'])
    const [playerTurn, setPlayerTurn] = createSignal(true)
    const [gameOutcome, setGameOutcome] = createSignal('')
    const [end, setEnd] = createSignal(false)
    const [computerScore, setComputerScore] = createSignal(0)
    const [playerScore, setPlayerScore] = createSignal(0)

    let playerPosition;

    const reset = () => {
        setIndex(0)
        setTiles(['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'])
        setPlayerTurn(true)
        setGameOutcome('')
        setEnd(false)
    }

    //handle up, down,left, and right keys on playersTurn to move playerPosition
    const handleUp = () => {
        if (playerTurn()) {
            if (index() - 3 >= 0) {
                setIndex(index() - 3)
            }
            console.log("up")
        }
    }

    const handleDown = () => {
        if (playerTurn()) {
            if (index() + 3 <= tiles().length - 1) {
                setIndex(index() + 3)
            }
            console.log("Down")
        }
    }

    const handleRight = () => {
        if (playerTurn()) {
            if ((index() + 1) % 3) {
                setIndex(index() + 1)
            }
            console.log("right")
        }
    }

    const handleLeft = () => {
        if (playerTurn()) {
            if (index() % 3) {
                setIndex(index() - 1)
            }
            console.log("left")
        }
    }

    const place = (position, marker) => {
        if (!end()) {
            if (tiles()[position] === 'e') {
                const updatedTiles = [...tiles()]
                updatedTiles[position] = marker
                setTiles(updatedTiles)
                console.log("winner", Utils.getWinner(updatedTiles))
                if (Utils.getWinner(updatedTiles)) {
                    setGameOutcome('Win')
                    setEnd(true)
                }
                setPlayerTurn(!playerTurn())
            }
        }
    }
    
    const handleEnter = () => {
        if (end()) {
            if (gameOutcome() === 'Win') {
                if (Utils.getWinner(tiles()) === 'x') {
                    setPlayerScore(playerScore() + 1)
                } else {
                    setComputerScore(computerScore() + 1)
                }
            }
            reset()
        } else if (playerTurn()) {
            place(index(), 'x')
            !end() && ComputerTurn()
        }
        console.log("enter")
    }

    //handle computers turn
    const ComputerTurn = () => {
        const AIPosition = Utils.AI(tiles())
        if (AIPosition === -1) {
            setGameOutcome('Tie')
            setEnd(true)
        }
        setTimeout(() => {
            if (!playerTurn()) {
                place(AIPosition, 'o')
            }
        }, ~~(Math.random() * 1200) + 200)

        //winner()
    }

    const getNotification = () => {
        if (end()) {
            if (gameOutcome() === 'Tie') {
                return 'Tie :( (press enter to try again)'
            } else if (gameOutcome() === 'Win') {
                if (Utils.getWinner(tiles()) === 'x') {
                    return 'Player wins (press enter to continue)'
                } else {
                    return 'Computer wins (press enter to continue)'
                }
            }
        }
        console.log("show notification")
    }

    createEffect(() => {
        playerPosition.x = (index() % 3) * 300 + 425
        playerPosition.y = ~~(index() / 3) * 300 + 125
        playerPosition.alpha = playerTurn() && !end() ? 1 : 0 || end() && 0
    });




    return (
        <View autofocus onEnter={handleEnter} onUp={handleUp} onDown={handleDown} onRight={handleRight} onLeft={handleLeft}>
            <Column>
                <Text style={{ fontSize: 29 }}>Player {playerScore}</Text>
                <Text style={{ y: 50, fontSize: 29 }}>Computer {computerScore}</Text>
            </Column>
            <View ref={playerPosition} style={{
                width: 250,
                height: 250,
                color: 0x40ffffff,
                x: 575,
                y: 125,
                zIndex: 1000,
            }} />
            <Grid x={700} y={100} color={0x40ffffff}/>
            <For each={tiles()}>
                {(tile, idx) => (
                    <Text style={{ x: (idx() % 3) * 300 + 525, y: ~~(idx() / 3) * 300 + 200, color: 0x40ffffff, zIndex: 1000, }}>
                        {tile === 'e' ? '' : tile} {/*{tile} */}
                    </Text>
                )}
            </For>
            <Show when={gameOutcome() === 'Win' || gameOutcome() === 'Tie'}>
                <Text style={{
                    color: 0x40ffffff, x: 700,
                    y: 100, zIndex: 2000,
                }}>
                    {getNotification()}
                </Text>
            </Show>
        </View>
    )

}
