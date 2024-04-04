import { Text, View } from '@lightningjs/solid';
import { onMount } from "solid-js"
import { useNavigate } from "@solidjs/router";

export default function Splash({text}) {
    const navigate = useNavigate();

    onMount(() => {
        const timeout = setTimeout(() => {
            navigate('/menu');
        }, 3000);

        return () => clearTimeout(timeout); // Cleanup function
    });
    return (
        <View>
            <Text fontFace={'pixel'}>{text}</Text>
        </View>
    )
}
