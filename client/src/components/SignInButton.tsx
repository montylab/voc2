import React from 'react'

export interface SignInButtonProps {
	onClick: () => void | Promise<void>;
	disabled?: boolean;
}

export const SignInButton: React.FC<SignInButtonProps> = ({onClick, disabled}) => {
	return (
		<button onClick={onClick} disabled={disabled}>
			Sign in with Google
		</button>
	)
}
