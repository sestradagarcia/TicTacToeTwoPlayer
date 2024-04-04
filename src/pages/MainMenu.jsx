import { Text, View } from '@lightningjs/solid';
import Menu from '../components/Menu';

export default function MainMenu() {
    return (
        <View style={{x: 600,
            y: 400,}}>
            <Menu items={[{ label: 'START GAME', path: '/game' }, { label: 'ABOUT', path: '/about'}, { label: 'BACK TO SPLASH', path: '/'}, { label: 'TO SPLASH', path: '/'}]}/>
        </View>
    )
}
