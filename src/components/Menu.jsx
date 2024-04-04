import { Text, View } from '@lightningjs/solid';
import { Column } from '@lightningjs/solid-primitives';
import { useNavigate } from "@solidjs/router";
import { activeElement } from "@lightningjs/solid";
import { createEffect, createSignal } from 'solid-js';

export default function Menu({ items }) {
  const [indicatorPosition, setIndicatorPosition] = createSignal(0)
  const navigate = useNavigate();

  let indicator;

  // const styles = {
  //   display: 'flex',
  //   justifyContent: 'flexStart',
  //   gap: 26,
  // }

  const handleEnter = (path) => {
    navigate(path);
    console.log("path set", path)
    console.log(activeElement().key)
  }

  const handleFocus =(index)=>{
    setIndicatorPosition(index*120)
    console.log("index on focus", index)
  }

  createEffect(() => {
    indicator.y = indicatorPosition();
  });

  return (
    <View>
      <Text ref={indicator}>&gt;</Text>
      <Column autofocus forwardFocus={0}> 
        <For each={items}>
          {(item, index) => (
            <Text key={index()} onFocus={()=> handleFocus(index())} onEnter={() => handleEnter(item.path)} 
                  style={{ x: 100, y: index() * 120, focus: { color: 0x40ffffff } }}>
              {item.label}
            </Text>
          )}
        </For>
      </Column>
    </View>
  )
}
