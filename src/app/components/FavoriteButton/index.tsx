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
    <AiFillHeart
      size={25}
      className={` absolute right-3 top-3 cursor-pointer z-50 ${
        filled ? 'fill-rose-500' : 'fill-slate-100 '
      }`}
      onClick={handleFavorite}
    />
  );
};
