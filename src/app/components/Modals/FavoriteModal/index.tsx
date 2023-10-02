import { useFavoriteModal } from '@/app/hooks/modals/useModal';

import Modal from '../../Modal';
import usePrivateStore from '@/app/hooks/store/usePrivateStore';
import useGlobalStore from '@/app/hooks/store/useGlobalStore';
import { ProductCard } from '../../ProductCard';

export const FavoriteModal = () => {
  const favoriteModal = useFavoriteModal();
  const { favorites } = usePrivateStore();
  const { products } = useGlobalStore();
  const body = (
    <div className='flex flex-col gap-6 w-11/12 mx-auto'>
      {favorites.map(favorite => (
        <div className='flex gap-x-2 gap-y-6 flex-wrap ' key={favorite.id}>
          {products
            .filter(p => p.id === favorite.product_id)
            .map(product => (
              <ProductCard product={product} key={product.id} fullWidth />
            ))}
        </div>
      ))}
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
