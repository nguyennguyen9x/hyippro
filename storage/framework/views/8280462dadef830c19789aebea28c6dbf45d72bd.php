<!-- footer section -->
<footer class="footer-section">
    <div class="overlay">
        <div class="container">
            <?php if(isset($templates['news-letter'][0]) && $newsLetter = $templates['news-letter'][0]): ?>
                <div class="row mb-5 justify-content-center">
                    <div class="col-lg-6">
                        <form action="<?php echo e(route('subscribe')); ?>" method="post">
                            <?php echo csrf_field(); ?>
                            <div class="newsletter text-center">
                                <h4><?php echo app('translator')->get(optional($newsLetter->description)->title); ?></h4>
                                <div class="input-group">
                                    <input type="email" class="form-control" name="email"
                                           placeholder="<?php echo app('translator')->get('Email Address'); ?>"/>
                                    <button class="btn-custom" type="submit"><?php echo app('translator')->get('Subscribe'); ?></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            <?php endif; ?>

            <div class="row gy-5 gy-lg-0">
                <div class="col-lg-3 col-md-6">
                    <div class="footer-box">
                        <a class="navbar-brand" href="<?php echo e(route('home')); ?>"> <img
                                src="<?php echo e(getFile(config('location.logoIcon.path').'logo.png')); ?>" alt=""/></a>
                        <?php if(isset($contactUs['contact-us'][0]) && $contact = $contactUs['contact-us'][0]): ?>
                            <p class="company-bio">
                                <?php echo app('translator')->get(strip_tags(@$contact->description->footer_short_details)); ?>
                            </p>
                        <?php endif; ?>

                        <?php if(isset($contentDetails['social'])): ?>
                            <div class="social-links">
                                <?php $__currentLoopData = $contentDetails['social']; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $data): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                    <a href="<?php echo e(@$data->content->contentMedia->description->link); ?>" class="facebook"
                                       target="_blank">
                                        <i class="<?php echo e(@$data->content->contentMedia->description->icon); ?>"></i>
                                    </a>
                                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 <?php echo e((session()->get('rtl') == 1) ? 'pe-lg-5': 'ps-lg-5'); ?>">
                    <div class="footer-box">
                        <h5><?php echo e(trans('Useful Links')); ?></h5>
                        <ul>
                            <li>
                                <a href="<?php echo e(route('home')); ?>"><?php echo app('translator')->get('Home'); ?></a>
                            </li>
                            <li>
                                <a href="<?php echo e(route('about')); ?>"><?php echo app('translator')->get('About'); ?></a>
                            </li>
                            <li>
                                <a href="<?php echo e(route('plan')); ?>"><?php echo app('translator')->get('Plan'); ?></a>
                            </li>
                            <li>
                                <a href="<?php echo e(route('blog')); ?>"><?php echo app('translator')->get('Blog'); ?></a>
                            </li>
                            <li>
                                <a href="<?php echo e(route('contact')); ?>"><?php echo app('translator')->get('Contact'); ?></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="footer-box">
                        <h5><?php echo app('translator')->get('OUR SERVICES'); ?></h5>
                        <?php if(isset($contentDetails['support'])): ?>
                            <ul>
                                <?php $__currentLoopData = $contentDetails['support']; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $data): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                    <li><a href="<?php echo e(route('getLink', [slug(@$data->description->title), @$data->content_id])); ?>"><?php echo app('translator')->get(@$data->description->title); ?></a></li>
                                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                                <li><a href="<?php echo e(route('faq')); ?>"><?php echo app('translator')->get('FAQ'); ?></a></li>
                            </ul>
                        <?php endif; ?>
                    </div>
                </div>

                <?php if(isset($contactUs['contact-us'][0]) && $contact = $contactUs['contact-us'][0]): ?>
                    <div class="col-lg-3 col-md-6">
                        <div class="footer-box">
                            <h4><?php echo e(trans('get in touch')); ?></h4>
                            <ul>
                                <li>
                                    <span><?php echo app('translator')->get(@$contact->description->email); ?></span>
                                </li>

                                <li>
                                    <span><?php echo app('translator')->get(@$contact->description->phone); ?></span>
                                </li>

                                <li>
                                    <span><?php echo app('translator')->get(@$contact->description->address); ?></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
            <div class="d-flex copyright justify-content-between align-items-center">
                <div>
                    <span> <?php echo app('translator')->get('All rights reserved'); ?> &copy; <?php echo e(date('Y')); ?> <?php echo app('translator')->get('by'); ?> <a
                            href="<?php echo e(route('home')); ?>"><?php echo app('translator')->get($basic->site_title); ?></a> </span>
                </div>

                <?php
                    $languageArray = json_decode($languages, true);
                ?>

                <div class="language-dropdown-items">
                    <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <span><?php echo app('translator')->get('English'); ?></span>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-start">
                        <?php $__currentLoopData = $languageArray; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $key => $lang): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                            <li>
                                <a href="<?php echo e(route('language',$key)); ?>" class="dropdown-item">
                                    <span><?php echo e($lang); ?></span>
                                </a>
                            </li>
                        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</footer>
<?php /**PATH E:\OT\projects\web-hyippro-php\resources\views/themes/lightagro/partials/footer.blade.php ENDPATH**/ ?>