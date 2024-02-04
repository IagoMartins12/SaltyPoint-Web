import { useFavoriteModal } from '@/app/hooks/modals/useModal';

import Modal from '../../Modal';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import useGlobalStore from '@/app/hooks/store/useGlobalStore';
import { ProductCard } from '../../ProductCard';
import { AnimationEmpty } from '../../Animations/AnimationEmpty';

export const FavoriteModal = () => {
  const favoriteModal = useFavoriteModal();
  const { favorites } = usePrivateStore();
  const { products } = useGlobalStore();
  const body = (
    <div className='flex flex-col gap-6 w-11/12 mx-auto h-full'>
      {favorites.length > 0 ? (
        favorites.map(favorite => (
          <div className='flex gap-x-2 gap-y-6 flex-wrap ' key={favorite.id}>
            {products
              .filter(p => p.id === favorite.product_id)
              .map(product => (
                <ProductCard product={product} key={product.id} fullWidth />
              ))}
          </div>
        ))
      ) : (
        <div className='w-full h-3/5 sm:h-4/5'>
          <AnimationEmpty text='Você ainda não favoritou nenhum produto' />
        </div>

        // <EmptyResult text='Você ainda não favoritou nenhum produto' />
      )}
    </div>
  );
  return (
    <Modal
      onClose={favoriteModal.onClose}
      body={body}
      isOpen={favoriteModal.isOpen}
      title='Meus favoritos'
    />
  );
};
