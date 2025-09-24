'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { deletePatternTB303 } from '@/dal';

interface DeletePatternProps {
  patternId: string;
  patternName: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function DeletePattern({
  patternId,
  patternName,
  isOpen,
  onClose,
  onSuccess,
}: DeletePatternProps) {
  const queryClient = useQueryClient();

  const deletePatternMutation = useMutation({
    mutationFn: () => deletePatternTB303(patternId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/v1/patterns/tb303'] });
      onClose();
      if (onSuccess) onSuccess();
    },
  });

  const handleDelete = async () => {
    await deletePatternMutation.mutateAsync();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Pattern</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the pattern &quot;{patternName}
            &quot;? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deletePatternMutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deletePatternMutation.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deletePatternMutation.isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
