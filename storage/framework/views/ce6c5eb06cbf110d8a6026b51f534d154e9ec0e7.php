<?php if(auth()->guard()->check()): ?>
    <?php if(config('basic.push_notification') == 1): ?>
        <!-- notification panel -->
        <div class="notification-panel push-notification" id="pushNotificationArea">
            <button class="dropdown-toggle">
                <i class="fal fa-bell"></i>
                <span v-if="items.length > 0" class="count" v-cloak>3</span>
            </button>
            <div class="notification-dropdown">
                <ul class="dropdown-box list-unstyled">
                    <li v-for="(item, index) in items" @click.prevent="readAt(item.id, item.description.link)">
                        <a class="dropdown-item" href="javascript:void(0)">
                            <i class="fal fa-bell"></i>
                            <div class="text">
                                <p v-cloak v-html="item.description.text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                <span class="time" v-cloak>{{ items.formatted_date }}</span>
                            </div>
                        </a>
                    </li>
                </ul>
                <div class="clear-all fixed-bottom">
                    <a href="javascript:void(0)" v-if="items.length == 0"
                       class=""><?php echo app('translator')->get('You have no notifications'); ?></a>
                    <a href="javascript:void(0)" role="button" type="button" v-if="items.length > 0"
                       @click.prevent="readAll" class="btn-clear"><?php echo app('translator')->get('Clear All'); ?></a>
                </div>
            </div>
        </div>
    <?php endif; ?>
<?php endif; ?>
<?php /**PATH E:\OT\projects\web-hyippro-php\resources\views/themes/lightagro/partials/pushNotify.blade.php ENDPATH**/ ?>