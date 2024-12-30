import { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

type Props = {
    pendingText: string;
    text: string;
    size?: 'sm' | 'md' | 'lg';
    icon?: ReactNode;
};

const mapSize = (
    size: 'sm' | 'md' | 'lg'
): 'default' | 'sm' | 'lg' | 'icon' | null | undefined => {
    if (size === 'md') {
        return 'default';
    }
    return size;
};

function SubmitButton({ pendingText, text, size = 'md', icon }: Props) {
    const { pending } = useFormStatus();

    return (
        <Button size={mapSize(size)} type="submit" disabled={pending}>
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {pendingText}
                </>
            ) : (
                <>
                    {icon && <span className="mr-2">{icon}</span>}
                    {text}
                </>
            )}
        </Button>
    );
}

export default SubmitButton;
