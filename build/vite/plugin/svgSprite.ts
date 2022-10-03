import path from 'path'
import SvgIconsPlugin from 'vite-plugin-svg-icons'

export function configSvgIconsPlugin(isBuild: boolean) {
  const svgIconsPlugin = SvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    svgoOptions: isBuild,
    symbolId: 'icon-[dir]-[name]',
  })

  return svgIconsPlugin
}
