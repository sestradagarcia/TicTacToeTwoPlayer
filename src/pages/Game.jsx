import { Text, View, hexColor } from "@lightningjs/solid";
import { Column } from '@lightningjs/solid-primitives';
import { createEffect, createSignal } from "solid-js";
import Utils from '../lib/GameUtils.js'
import Grid from "../components/Grid.jsx";

export default function Game() {
    const [index, setIndex] = createSignal(0)
    const [tiles, setTiles] = createSignal(['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'])
    const [player1Turn, setPlayer1Turn] = createSignal(true)
    const [gameOutcome, setGameOutcome] = createSignal('')
    const [end, setEnd] = createSignal(false)
    const [player2Score, setPlayer2Score] = createSignal(0)
    const [player1Score, setPlayer1Score] = createSignal(0)

    let playerPosition;
    let player1
    let player2

    const reset = () => {
        setIndex(0)
        setTiles(['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'])
        setPlayer1Turn(true)
        setGameOutcome('')
        setEnd(false)
    }

    //handle up, down,left, and right keys on playersTurn to move playerPosition
    const handleUp = () => {
            if (index() - 3 >= 0) {
                setIndex(index() - 3)
            }
            console.log("up")
    }

    const handleDown = () => {
            if (index() + 3 <= tiles().length - 1) {
                setIndex(index() + 3)
            }
            console.log("Down")
    }

    const handleRight = () => {
            if ((index() + 1) % 3) {
                setIndex(index() + 1)
            }
            console.log("right")
    }

    const handleLeft = () => {
            if (index() % 3) {
                setIndex(index() - 1)
            }
            console.log("left")
    }

    const place = (position, marker) => {
        if (!end()) {
            if (tiles()[position] === 'e') {
                const updatedTiles = [...tiles()]
                updatedTiles[position] = marker
                const tilesRemaining = updatedTiles.map((el, idx) => {
                    if (el === 'e') return idx
                  }).filter(Boolean)
                setTiles(updatedTiles)
                console.log("winner", Utils.getWinner(updatedTiles))
                if (Utils.getWinner(updatedTiles)) {
                    setGameOutcome('Win')
                    setEnd(true)
                }else if (!tilesRemaining.length) {
                    setGameOutcome('Tie')
                    setEnd(true)
                }
                setPlayer1Turn(!player1Turn())
            }
        }
    }

    const handleEnter = () => {
        if (end()) {
            if (gameOutcome() === 'Win') {
                if (Utils.getWinner(tiles()) === 'x') {
                    setPlayer1Score(player1Score() + 1)
                } else {
                    setPlayer2Score(player2Score() + 1)
                }
            }
            reset()
        } else if (player1Turn()) {
            place(index(), 'x')
        }else if (!player1Turn()) {
            place(index(), 'o')
        console.log("enter")
        }
    }

    const getNotification = () => {
        if (end()) {
            if (gameOutcome() === 'Tie') {
                return 'Tie (press enter to try again)'
            } else if (gameOutcome() === 'Win') {
                if (Utils.getWinner(tiles()) === 'x') {
                    return 'Player 1 wins (press enter to continue)'
                } else {
                    return 'Player 2 wins (press enter to continue)'
                }
            }
        }
        console.log("show notification")
    }

    createEffect(() => {
        playerPosition.x = (index() % 3) * 300 + 435
        playerPosition.y = ~~(index() / 3) * 300 + 145
        playerPosition.alpha = !end() ? 0.1 : 0 || end() && 0
        playerPosition.color = player1Turn()? hexColor('#FFFF00') : hexColor('#FF0000')
        player1.fontSize = player1Turn() && !end()? 50 : 40
        player2.fontSize = !player1Turn() && !end()? 50 : 40
    });

    return (
        <View autofocus onEnter={handleEnter} onUp={handleUp} onDown={handleDown} onRight={handleRight} onLeft={handleLeft}>
            <Column>
                <Text ref={player1} style={{ y: 10, fontSize: 40, color: hexColor('#FFFF00') }}>Player 1:  {player1Score()}</Text>
                <Text ref={player2} style={{ y: 60, fontSize: 40, color: hexColor('#FF0000')}}>Player 2:  {player2Score()}</Text>
            </Column>
            <View ref={playerPosition} style={{
                width: 250,
                height: 250,
                color: 0x40ffffff,
                x: 575,
                y: 145,
                zIndex: 1000,
                transition: { 
                    y: { duration: 800, easing: 'ease-in-out' }, 
                    x: { duration: 800, easing: 'ease-in-out' }, 
                  },
            }} />
                <Grid x={700} y={120} color={0x40ffffff}/>
                <For each={tiles()}>
                    {(tile, idx) => (
                        <Text style={{ x: (idx() % 3) * 300 + 525, y: ~~(idx() / 3) * 300 + 210, color: 0x40ffffff, zIndex: 1000, }}>
                            {tile === 'e' ? '' : tile} {/*{tile} */}
                        </Text>
                    )}
                </For>
            <Show when={gameOutcome() === 'Win' || gameOutcome() === 'Tie'}>
                <Text style={{ fontSize: 60, width: 1500, contain: 'width', textAlign: 'centre',
                    color: 0x40ffffff, x: 300,
                    y: 0, zIndex: 1000,
                    alpha: 1,
                    transition: {
                        alpha: { duration: 300, easing: "ease-in" },
                    }
                }}>
                    {getNotification()}
                </Text>
            </Show>
        </View>
    )

}
