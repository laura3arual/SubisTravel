interface ILogger {
	info: (message: string, data?: {}, title?: string) => void;
	error: (message: string, data?: {}, title?: string) => void;
	success: (message: string, data?: {}, title?: string) => void;
	warning: (message: string, data?: {}, title?: string) => void;
}
