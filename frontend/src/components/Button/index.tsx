import React, { FunctionComponent, useState } from 'react'

type ButtonProp = {
  icon?: { iconPath?: string; iconStatic?: boolean; iconShowing?: boolean }
  secondary?: boolean
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const Button: FunctionComponent<ButtonProp> = (props) => {
  const [isHover, setIsHover] = useState(props.icon?.iconShowing)

  return (
    <button
      {...props}
      className={`align-middle justify-self-center text-base
      ${!props.secondary && !props.disabled ? 'btn-primary' : ''}
      ${props.secondary && !props.disabled ? 'btn-secondary' : ''}
      ${props.disabled ? 'btn-disabled' : ''}
      transform my-auto flex ${props.className || ''}`}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(props?.icon?.iconShowing)}
      onFocus={() => (isHover ? null : setIsHover(true))}
    >
      {props.children}

      {isHover && props.icon?.iconPath && (
        <img
          className={`w-4 my-auto mx-1 ${props.icon?.iconStatic ? '' : 'animate-bounce'}`}
          src={props.icon?.iconPath}
          alt={props.icon?.iconPath}
        />
      )}
    </button>
  )
}

export default Button
