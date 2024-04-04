import { Text, View } from "@lightningjs/solid";
import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";
import Grid from "../components/Grid";

export default function About() {
    const navigate = useNavigate();

    // let tile0;
    // let tile1;

    const tiles= ['x','o','x','o','o','x','o','x','x']

    // onMount(() => {
    //     tile0.animate({ alpha: 1, scale: 1.1 }, { duration: 500 }).start();
    //   });
  return (
    <View onBack={()=>navigate('/menu')}>
        <Text style={{fontSize: 60}}>
            This is a tic-tac-toe game made by Stephanie using LightningJS
        </Text>
        <Grid x={700} y={100} color={0xffffffff}/>
        <For each={tiles}>
                {(tile, idx) => (
                    <Text style={{ x: (idx() % 3) * 300 + 470, y: ~~(idx() / 3) * 300 + 200, color: 0x40ffffff, zIndex: 1000}}> {/*ref={`${"tile"+idx}`}*/}
                        {tile}
                    </Text>
                )}
        </For>
        <View style={{ width: 5, height: 900, x: 1155, y: 100, color:0xffffffff }} />
    </View>
  )
}
