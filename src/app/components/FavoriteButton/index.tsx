import useAuth from '@/app/hooks/auth/useAuth';
import { useLoginModal } from '@/app/hooks/modals/useModal';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import { addFavorites, deleteFavorite } from '@/app/services';
import { FavoriteButtonProps } from '@/app/types/ComponentTypes';
import { DeleteFavoritesDto, FavoritesDto } from '@/app/types/Dtos';
import toast from 'react-hot-toast';
import { AiFillHeart } from 'react-icons/ai';

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  product,
  filled,
}) => {
  const { favorites, setFavorites } = usePrivateStore();
  const { isLogged } = useAuth();
  const loginModal = useLoginModal();

  const handleFavorite = async () => {
    const isFavorite = filled;

    try {
      if (isFavorite) {
        const findFavorite = favorites.find(f => f.product_id === product.id);

        if (!findFavorite) return;

        await deleteFavorite({
          id: findFavorite.id,
        } as DeleteFavoritesDto);
        const updatedFavorites = favorites.filter(
          f => f.product_id !== product.id,
        );
        setFavorites(updatedFavorites);
        toast.success('Produto removido');
      } else {
        const response = await addFavorites({
          product_id: product.id,
        } as FavoritesDto);
        const updatedFavorites = [...favorites, response];
        setFavorites(updatedFavorites);
        toast.success('Produto adicionado');
      }
    } catch (error) {
      toast.error('Erro');
    }
  };

  return (
    <div className='w-10 h-10 rounded-full bg-[#dfdfdf] absolute right-2 top-2 flex items-center justify-center'>
      <AiFillHeart
        size={25}
        className={` z-30  cursor-pointer  ${
          filled ? 'fill-rose-500' : 'fill-slate-100 '
        }`}
        onClick={() => {
          if (!isLogged) {
            toast.error('Faça o login para adicionar o produto');
            loginModal.onOpen();
            return;
          }
          handleFavorite();
        }}
      />
    </div>
  );
};
