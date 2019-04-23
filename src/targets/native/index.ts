import { StyleSheet, View, Text } from 'react-native'
import { config } from '../../shared/constants'
import { interpolate } from '../../interpolate'
import { useChain } from '../../useChain'
import { useSpring } from '../../useSpring'
import { useSprings } from '../../useSprings'
import { useTrail } from '../../useTrail'
import { useTransition } from '../../useTransition'
import * as Globals from '../../animated/Globals'
import animated, { withExtend } from '../../animated/createAnimatedComponent'
import colorNames from '../../shared/colors'
import createStringInterpolator from '../../shared/stringInterpolation'
import AnimatedTransform from './AnimatedTransform'
import AnimatedStyle from '../../animated/AnimatedStyle'

Globals.assign({
  defaultElement: View,
  colorNames,
  createStringInterpolator,
  applyAnimatedValues: (instance, props) =>
    instance.setNativeProps ? instance.setNativeProps(props) : false,
  createAnimatedTransform: transform => new AnimatedTransform(transform),
  createAnimatedStyle: styles => new AnimatedStyle(StyleSheet.flatten(styles)),
  createAnimatedRef: (node, mounted, forceUpdate) => ({
    getNode: () => node.current,
    setNativeProps: props => {
      const didUpdate = Globals.applyAnimatedValues(node.current, props)
      if (!didUpdate) mounted!.current && forceUpdate!()
    },
  }),
})

const nativeAnimated = withExtend(animated).extend(View, Text)

/** @deprecated Use `animated.extend` instead */
export const apply = nativeAnimated.extend

export { Spring, Trail, Transition } from '../../elements'
export {
  config,
  nativeAnimated as animated,
  nativeAnimated as a,
  interpolate,
  Globals,
  useSpring,
  useTrail,
  useTransition,
  useChain,
  useSprings,
}
